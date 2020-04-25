import { Company, Sorting, Searching, Pagination } from './companies.model';

export namespace CompaniesActions {

    export class GetCompanyList {
        static readonly type = '[Companies] GetCompanyList';
    }

    export class Apply {
        static readonly type = '[Companies] Apply';
    }

    export class Sort {
        static readonly type = '[Companies] Sort';
        constructor (public sort: Sorting) {}
    }

    export class Search {
        static readonly type = '[Companies] Search';
        constructor (public search: Searching) {}
    }

    export class Paginate {
        static readonly type = '[Companies] Paginate';
        constructor (public pagination: Pagination) {}
    }

}