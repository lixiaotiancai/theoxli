declare interface Window {
  [key: string]: any;
  wx: {
    getSystemInfoSync: any
    navigateTo: any
  }
}