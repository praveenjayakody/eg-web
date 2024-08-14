import { lazy, LazyExoticComponent, ComponentType } from "react"

type ModuleImport<T> = () => Promise<{ default: ComponentType<T> }>

// Wrap dynamic imports with a function to handle refreshing on error
const loadImportWrapper = <T>(
  importPromise: Promise<{ default: ComponentType<T> }>
): Promise<{ default: ComponentType<T> }> => {
  return importPromise.catch(() => {
    window.location.reload()
    // Return a rejected Promise just to match the return type
    return Promise.reject()
  })
}

// Lazy load wrapper component
const lazyLoadWrapper = <T>(
  importPromise: ModuleImport<T>
): LazyExoticComponent<ComponentType<T>> => {
  return lazy(() => {
    return loadImportWrapper(importPromise()).then(module => ({
      default: module.default
    }))
  })
}

export default lazyLoadWrapper
