import { useEffect, useRef } from "react";

export function useCustomMemo(cb, deps) {
  const isEqualDeps = (deps, prevDeps) => {
    if (!prevDeps || deps.length != prevDeps.length) return false;

    for(let i=0;i<deps.length;i++){
        if(deps[i] !== prevDeps[i]) return false
    }
    return true
  };
  const memoizedRef = useRef({ value: undefined, dependencies: [] });
  if (!deps || !isEqualDeps(memoizedRef.current.dependencies, deps)) {
    
    memoizedRef.current.value = cb();
    memoizedRef.current.dependencies = deps;
  }
  useEffect(() => {
    return () => {
      memoizedRef.current.value = null;
    };
  }, []);

  return memoizedRef.current.value;
}
