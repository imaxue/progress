enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}
interface Thenable<R> {
  then<U>(
    onFulfilled?: (value: R) => U | Thenable<U>,
    onRejected?: (error: any) => U | Thenable<U>
  ): Thenable<U>
  then<U>(
    onFulfilled?: (value: R) => U | Thenable<U>,
    onRejected?: (error: any) => void
  ): Thenable<U>
}
class MyPromise<R> {
  constructor(excutor: (
    resolve: (value?: R | Thenable<R>) => void,
    reject: (error?: any) => void
  ) => void) {
    try {
      excutor(
        value => {
        this.resolvePromise(value)
      },
        reason => {
          this.rejectPromise(reason)
        }
      )
    } catch (error) {
      this.rejectPromise(error)
    }
  }
  /**
   * 初始状态
   * @default 'pending'
   */
  private status: Status = Status.PENDING
  /**
   * fulfilled状态时 返回的信息
   */
  private value: R
  /**
   * rejected状态时 拒绝的原因
   */
  private reason: any
  /**
   * 存储fulfilled状态对应的onFulfilled函数
   */
  onFulfilledCallbacks: Array<any>
  onRejectedCallbacks: Array<() => any>
  then() {}
  catch() {}
  finally() {}
  static resolve() {}
  static reject() {}
  static all() {}
  static race() {}
  private resolvePromise(value: any) {
    if (value === this) {
      this.rejectPromise(new Error('resolve self error'))
    }
  }
  private rejectPromise(reason: any) {
    this.status = Status.REJECTED
    this.reason = reason
  }
}
