export async function toArray<A>(iter: AsyncIterable<A>): Promise<A[]> {
  const arr: A[] = []
  for await(const item of iter) {
    arr.push(item)
  }
  return arr
}