//Variable declarations
//-----------------------
let name:string; // string
let age: number | string; // number or string
let isStudent:boolean; // boolean
let hobbies: string[]; // array of strings
let role:[number, string]; // Contains one number & one string
let anything : any; // Not recommended
let notKnown: unknown; // Instead of any, if we don't know what it returns

//Alias
//-----------------------

/*type Person = {
  name:string;
  age?:number; // Question mark optional
}

let person: Person= {name: "John", age:20}

let lotsOfPeople:Person[];*/

type x ={
  a: string;
  b: number;
}

type y = x & {
  c: string;
  d: number;
}

interface Person {
  name: string;
  age?: number;
}

interface Guy extends Person {
  profession: string;
}




//Functions
//-----------------------

function printName(name:string)
{
  console.log(name);
  return name;
}

let printNameTwo: (name: string) => void; // Returns undefined
let printNameThree: (name: string) => never; // Returns nothing
