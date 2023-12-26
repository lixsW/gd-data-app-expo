interface RequestOptions extends RequestInit {
  // 可以根据需要定义更多的请求选项类型
}

async function useFetch<T>(url: string, options: RequestOptions): Promise<T> {
  const modifiedOptions: RequestOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  };

  // 请求发出前的拦截操作
  // console.log('Request intercepted:', url, modifiedOptions);
  const token = await storage.load({key: 'token'});

  // console.log(token, 'token');
  (modifiedOptions.headers as Record<string, string>).authorization = token;

  return fetch(url, modifiedOptions)
    .then(response => {
      // 请求返回后的拦截操作
      // console.log('Response intercepted:', response ,'@');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      // 处理请求或响应过程中的错误
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });
}
export default useFetch;
