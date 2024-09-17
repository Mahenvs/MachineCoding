// utils/debounce.ts
export const debounce = (func, delay: number) => {
    let timeoutId:number;
  
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  