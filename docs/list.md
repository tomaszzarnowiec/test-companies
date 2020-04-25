## List

Structure of template that simply view the table like elements.
This is a table but construct by divs.

### Structure

```
<div class="list companies">
    <div class="list-header">
        <div class="column id">
            ...
        </div>
        <div class="column name">
            ...
        </div>
        ...
    </div>
    <div class="list-content">
        <div class="loading" *ngIf="(isLoading$ | async)">Loading...</div>
        <app-company-list-item class="list-row"></app-company-list-item>
    </div>
    <div class="list-pagination">
        ...
    </div>
</div>
            
```

Class `companies` modify view of list. this is custom modificator class for default table CSS.