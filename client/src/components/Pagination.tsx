/*=============================================== Pagination ===============================================*/

import React from "react"
import { Pagination as Container, PaginationButton } from "tsx-library-julseb"
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
} from "react-router-dom"

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages,
    pageLimit,
}: Props) => {
    const navigate = useNavigate()
    const [q] = useSearchParams()
    const query = q.get("query")

    const nextPage = () => {
        setCurrentPage(currentPage + 1)

        query
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      query,
                      page: (currentPage + 1).toString(),
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: (currentPage + 1).toString(),
                  }).toString(),
              })
        window.scrollTo(0, 0)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)

        query
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      query,
                      page: (currentPage - 1).toString(),
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: (currentPage - 1).toString(),
                  }).toString(),
              })
        window.scrollTo(0, 0)
    }

    const goToPage = (e: any) => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)

        query
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      query,
                      page: pageNumber.toString(),
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: pageNumber.toString(),
                  }).toString(),
              })
        window.scrollTo(0, 0)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        return (
            new Array(pageLimit)
                // @ts-expect-error
                .fill()
                .map((_, i) => start + i + 1)
                .filter(item => item <= totalPages)
        )
    }

    return (
        <Container justify="center">
            <PaginationButton
                onClick={prevPage}
                content="prev"
                disabled={currentPage === 1 && true}
            />

            {getPaginationGroup()[0] !== 1 && (
                <>
                    <PaginationButton content={1} onClick={goToPage} />
                    <PaginationButton content="more" />
                </>
            )}

            {getPaginationGroup().map(item => (
                <PaginationButton
                    content={item}
                    key={item}
                    onClick={goToPage}
                    isActive={currentPage === item && true}
                />
            ))}

            {getPaginationGroup()[getPaginationGroup().length - 1] !==
                totalPages && (
                <>
                    <PaginationButton content="more" />

                    <PaginationButton content={totalPages} onClick={goToPage} />
                </>
            )}

            <PaginationButton
                onClick={nextPage}
                content="next"
                disabled={currentPage === totalPages && true}
            />
        </Container>
    )
}

export default Pagination

interface Props {
    currentPage: number
    setCurrentPage: any
    totalPages: number
    pageLimit: number
}
