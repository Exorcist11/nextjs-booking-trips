import { Button } from '@/components/ui/button';
import { Icons } from '@/constants/svgIcon';
import { cn } from '@/lib/utils';
import React from 'react';
// import { Input } from '../ui/input';
// import { REGEX_NON_NUMBER } from '@/constants/regexExp';
// import isString from 'lodash/isString';
// import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import HStack from '../HStack';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PaginationCustomProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChangePage: (pageIndex: number) => void;
  onChangePageSize: (pageSize: number) => void;
}

const PaginationCustom = (props: PaginationCustomProps) => {
  const { pageIndex, pageSize, totalCount, onChangePage, onChangePageSize } = props;
  // const [goToPage, setGoToPage] = React.useState<string>();
  const isFirstPage = pageIndex === 1;
  const lastPageIndex = Math.ceil(totalCount / pageSize);
  const isLastPage = pageIndex === lastPageIndex;
  const { t } = useTranslation();

  // const pagesArray = React.useMemo(() => {
  //   const pages = new Set<number>();
  //   // Always include the first page
  //   pages.add(1);
  //   // Include the surrounding pages of the current page
  //   if (pageIndex > 2) pages.add(pageIndex - 1);
  //   pages.add(pageIndex);
  //   if (pageIndex < lastPageIndex - 1) pages.add(pageIndex + 1);
  //   // Always include the last page
  //   pages.add(lastPageIndex);

  //   return Array.from(pages).sort((a, b) => a - b);
  // }, [pageIndex, lastPageIndex]);

  // const handleClickPage = (pageIndex: number) => {
  //   onChangePage && onChangePage(pageIndex);
  //   // setGoToPage('');
  // };

  const handleNextPage = () => {
    onChangePage(pageIndex + 1);
    // setGoToPage('');
  };

  const handlePreviousPage = () => {
    onChangePage(pageIndex - 1);
    // setGoToPage('');
  };

  // const valueDisplay = React.useCallback(
  //   (currentValue: string | undefined) => {
  //     if (isString(currentValue) && currentValue.trim() && Number(currentValue) <= lastPageIndex)
  //       return String(+currentValue);
  //     return '';
  //   },
  //   [lastPageIndex]
  // );
  // const handleChangeToPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputElement = event?.target;
  //   let currentValue = inputElement?.value?.replace(REGEX_NON_NUMBER, '');
  //   if (inputElement?.value && !currentValue) {
  //     return;
  //   }

  //   setGoToPage(String(currentValue));
  //   debouncedChangePage(Number(currentValue));
  // };

  // const debouncedChangePage = React.useCallback(
  //   debounce((newPageIndex: number) => {
  //     if (newPageIndex >= 1 && newPageIndex !== pageIndex && newPageIndex <= lastPageIndex) {
  //       onChangePage(newPageIndex);
  //       setGoToPage('');
  //     }
  //   }, 500),
  //   [lastPageIndex, pageIndex]
  // );

  if (totalCount === 0) return null;
  return (
    <div className='flex items-center justify-end space-x-2 pt-[10px]'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-normal text-nowrap'>Rows per page:</p>
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={value => {
            onChangePageSize(Number(value));
          }}
        >
          <SelectTrigger className='w-[70px] h-[40px]'>
            <SelectValue placeholder='10' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <HStack className='gap-5'>
        <div className='text-sm font-normal'>
          {(pageIndex - 1) * pageSize + 1}-{Math.min(pageIndex * pageSize, totalCount)} {t('content.of')}
          <span> {totalCount}</span>
        </div>
        {/* <div className='flex items-center space-x-2'>
          <p className='text-sm'>{t('content.goToPage')}</p>
          <Input
            className='w-[52px] text-center'
            // value={valueDisplay(goToPage !== '' ? goToPage : pageIndex.toString())}
            value={valueDisplay(goToPage ?? pageIndex.toString())}
            onChange={handleChangeToPage}
          />
        </div> */}
        <div className='flex items-center space-x-2'>
          <Button
            className={cn(
              'h-8 w-8 p-0 bg-purple2Color hover:bg-purple2Color/90 disabled:bg-purple2Color/15 disabled:opacity-100'
            )}
            onClick={handlePreviousPage}
            disabled={isFirstPage}
          >
            <Icons.LeftArrowIcon className={cn(isFirstPage ? 'stroke-black' : 'stroke-white')} />
          </Button>
          {/* <PaginationContent>
          {pagesArray.map((e, i) => (
            <React.Fragment key={e}>
              <PaginationItem
                className='cursor-pointer'
                onClick={() => {
                  if (e === pageIndex) return;
                  handleClickPage(e);
                }}
              >
                <PaginationLink isActive={e === pageIndex}>{e}</PaginationLink>
              </PaginationItem>
       
              {pagesArray[i + 1] && pagesArray[i + 1] - e > 1 && (
                <PaginationItem key={`ellipsis-${e}-${pagesArray[i + 1]}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
        </PaginationContent> */}
          <Button
            className={cn(
              'h-8 w-8 p-0 bg-purple2Color hover:bg-purple2Color/90 disabled:bg-purple2Color/20 disabled:opacity-100'
            )}
            onClick={handleNextPage}
            disabled={isLastPage}
          >
            <Icons.RightArrow className={cn(isLastPage ? 'stroke-purple2Color' : 'stroke-white')} />
          </Button>
        </div>
      </HStack>
    </div>
  );
};

export default PaginationCustom;
