import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await data.json();
  return response;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getter,
    refetchInterval: 10 * 1000,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default App;
