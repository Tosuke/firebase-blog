type Right<A> = { type: 'right', value: A }
type Left<E> = { type: 'left', value: E }
export type Either<A, E> = Right<A> | Left<E>

export function right<A>(value: A): Right<A> {
  return { type: 'right', value }
}

export function left<E>(value: E): Left<E> {
  return { type: 'left', value }
}

export function mapEither<A, B, E, F>(either: Either<A, E>, onRight: (a: A) => B, onLeft: (e: E) => F): Either<B, F> {
  return either.type === 'right' ? right(onRight(either.value)) : left(onLeft(either.value)) 
}