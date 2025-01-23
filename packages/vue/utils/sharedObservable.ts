import { Observable } from './observable'

// 创建单例的 Observable 实例
const sharedObservable = new Observable()

export default sharedObservable
