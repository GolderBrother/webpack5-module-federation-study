import React from "react";
const RemoteSlides = React.lazy(() => import("host/Slides"));
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));
const App = () => (
    <div>
        <h1>本地组件All</h1>
        <h2>远程组件Slides</h2>
        <React.Suspense fallback="Loading Slides">
            <RemoteSlides />
        </React.Suspense>
        <h2>远程组件NewsList</h2>
        <React.Suspense fallback="Loading NewsList">
            <RemoteNewsList />
        </React.Suspense>
    </div>
);
export default App;