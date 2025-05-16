import "@/styles/globals.css";
import Wrapper from "../pages/layout/wrapper/wrapper";
import { store } from "@/toolkit/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
return(
<QueryClientProvider client= {queryClient}>
  <Provider store={store}>
    <Wrapper>
  <Component {...pageProps} />
  </Wrapper>
  </Provider>
  </QueryClientProvider>
  )
}
