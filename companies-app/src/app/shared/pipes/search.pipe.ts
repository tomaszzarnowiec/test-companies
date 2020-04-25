import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(arr: any[], searchText): any[] {
        if(!searchText) return arr;
        return arr.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    }
}