# City Finder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Introduction

For the purpose of this test, I implemented a simple app with **AppComponent (AC)** and its child, **SearchComponent (SC)**. SC, with its input field, passes data input up to AC.

## Implementation

### AppComponent

```typescript
getCities(name: string) {
  this.totalCities = 0;
  this.subCities$ = this._citiesService.getCities(name).subscribe(
    {
      next: response => {
        this.subscriptionList.add(this.subCities$);
        if (response) {
          this.citiesList = response.data;
          this.totalCities = response.totalRecords;
          this.citiesStringList = response.data.map(
            (el: City) => `${el.name}, ${el.region || ''} (${el.country})`.replace(/\s\|\s$/, '')
          );
        }
      },
      error: err => {
        this.totalCities = 0;
        console.error(err);
      }
    }
  );
}
```

### SearchComponent

### Data source

After analyzing the **world-cities.txt**, the first step was to produce a JSON file for all records. 
As one of the requirements was to write a webserver, I decided to utilise my Portfolio's existing server,
built with Node.js and Express. Data is stored in MongoDB.

There was one obstacle to overcome - duplicated records. As all city names are valid and belong to different regions of the world, 
I thought it would be good to enhance the JSON by adding **country** and **region** fields. Unfortunately, with such a
large dataset, even utilising ChatGPT was problematic. Luckily, I found the exact same dataset in JSON, including
all fields I was after. This was found on [codesandbox.io](https://codesandbox.io/p/github/riyantowibowo/world-cities-json/main?file=%2Fdata%2Fcities.json%3A38495%2C20-38495%2C29)

#### Node.js with Express server



##### MongoDB

## Testing




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
