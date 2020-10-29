import { act } from "react-dom/test-utils";

type Item = {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  created: number;
};

const observers = new Map<IntersectionObserver, Item>();

beforeAll(() => {
  global.IntersectionObserver = jest.fn((callback, options = {}) => {
    const item = {
      callback,
      elements: new Set<Element>(),
      created: Date.now(),
    };
    const instance: IntersectionObserver = {
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold ?? 0],
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? "",
      observe: jest.fn((element: Element) => {
        item.elements.add(element);
      }),
      unobserve: jest.fn((element: Element) => {
        item.elements.delete(element);
      }),
      disconnect: jest.fn(() => {
        observers.delete(instance);
      }),
      takeRecords: jest.fn(),
    };
    observers.set(instance, item);
    return instance;
  });
});

afterEach(() => {
  observers.clear();
});

function triggerIntersection(
  elements: Element[],
  isIntersecting: boolean,
  observer: IntersectionObserver,
  item: Item,
) {
  const entries: IntersectionObserverEntry[] = [];
  elements.forEach((element) => {
    entries.push({
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: isIntersecting
        ? element.getBoundingClientRect()
        : {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON(): Record<string, unknown> {
              return {};
            },
          },
      isIntersecting,
      rootBounds: observer.root ? observer.root.getBoundingClientRect() : null,
      target: element,
      time: Date.now() - item.created,
    });
  });
  act(() => item.callback(entries, observer));
}

function intersectionMockInstance(element: Element): IntersectionObserver {
  let elementFound: IntersectionObserver | null = null;
  observers.forEach((value, key) => {
    if (value.elements.has(element)) {
      elementFound = key;
    }
  });
  if (elementFound) return elementFound;
  throw new Error("IntersectionObserver not found");
}

export function mockIsIntersecting(
  element: Element,
  isIntersecting: boolean,
): void {
  const observer = intersectionMockInstance(element);
  if (!observer) {
    throw new Error("IntersectionObserver not found for element");
  }
  const item = observers.get(observer);
  if (item) {
    triggerIntersection([element], isIntersecting, observer, item);
  }
}
