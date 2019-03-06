export async function toArray<T>(ai: AsyncIterable<T>): Promise<T[]> {
  const arr: T[] = []
  for await(const item of ai) {
    arr.push(item)
  }
  return arr
}