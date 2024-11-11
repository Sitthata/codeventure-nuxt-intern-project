import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {
  const cached = useSessionStorage<T>(url, null, {
    // Seralize the data into string
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      // Use the cookie from the request
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch from url: ${url}`,
      });
    }
    cached.value = data.value as T;
  } else {
    console.log(`Getting value from cached for ${url}`);
  }

  return cached;
};
