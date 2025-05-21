import WriteListGrid from './writeListGrid';

const Page = async () => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: [QUERY_KEY.SOCIAL],
  //   queryFn: getSocialList,
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <div>
      {/* <PageHeader/> */}

      <div>
        <>
          {/* <CategoryTabBar /> */}
          {/* <button>모임만들기</button> */}
        </>
        {/* <FilterBar /> */}
      </div>

      <WriteListGrid />
    </div>
    // </HydrationBoundary>
  );
};

export default Page;
