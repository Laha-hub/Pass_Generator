import { queueJob } from './scheduler.js';

const handler = {
  get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, key);
    return res;
  },
  set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return res;
  }
}
function reactive(target) {
  return new Proxy(target, handler);
}

let activeEffect = null;
function effect(fn, { lazy = false } = {}) {
  try {
    activeEffect = fn;
    activeEffect.lazy = lazy;
    activeEffect();
    return activeEffect;
  } finally {
    activeEffect = null;
  }
}

const targetMap = new WeakMap();
function track(target, key) {
  if (activeEffect === null) {
    return;
  }
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  if (!deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const deps = depsMap.get(key);
  if (!deps) {
    return;
  }
  deps.forEach(effect => {
    if(effect.lazy) {
      queueJob(effect);
    } else {
      effect();
    }
  });
}

export { effect, trigger, reactive };
