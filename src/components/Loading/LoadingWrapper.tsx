import React from 'react'

interface ILoadingProps {
    loading: boolean;
    children: React.ReactNode;
}

export default function LoadingWrapper(props: ILoadingProps) {
    if(props.loading){
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        );
    }
  return <div>{props.children}</div>;
}
