## App module

### NGXS Initialize

In app-module import a NgXS module for supporting state management.

As parameter you should add a states that will be initialized.

```
imports: {
    ...
    NgxsModule.forRoot([CompaniesState])
    ...
}
```