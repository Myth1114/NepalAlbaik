// class Bishal {
//   constructor(name, lastname) {
//     this.name = name;
//     this.lastname = name;
//   }
// }
// let BisahlObj = new Bishal("bsal", "singh");

// // const testObj={
// //     //test obj is assinged value to this which points to global obj in creation phase
// //     a:"bishal",
// //     b:1,
// //     c:this.a // this here is pointing to global obj ..why see below description
// //     d:function(){
// //         console.log(this.a); // this var is pointing to the testObj ..see below description
// //     }
// // }
// // console.log(testObj)

// //! this var has one meaning....it is a pointer to obj
// //! which obj it points to depends on implementation
// //? by defalut all the obj fxn arrays etc have this== global //true
// /* if this==global // true is to be changed ...then there must be a method call
// which will replace the this to mem addr of the obj doing the method call */
// // in arrow fxn this var will refer to the value of this in parent scope which will have
// //    some defn of this with it ...global or specific
// //! objects and arrays the value of this is undefined and if defined then it will be defined by closure
// //! in node js the default value of this in global context is the export of the module

// // const testObj = {
// //   d: this,
// //   a: "bishal",
// //   b: "singh",
// //   c:{
// //       a: ["bishal", this, "singh"],
// //   }
// // };

// // class Bishals {
// //   constructor(a, b) {
// //     this.a = a;
// //     this.b = b;
// //   }
// // // }
// // // const bishalObj = new Bishals("jharna", "singh");

// // // console.log(testObj.c);
// // // const bishalArr = ["bishal", this, "singh"];
// // // console.log("array", bishalArr);
// // const testObj={
// //   a:function(){
// //     console.log(this,"first value")
// //   },
// //   b:function(){

// //   }
// // }
// // testObj.b();

// // // todo write a fxn that accepts an price and options as args and calcs the finalprice
// // const calcPrice = (price, optionsArray) => {
// //   const options = {
// //     options1: ["s", "m", "l"],
// //     options2: ["c", "cb", "xc"],
// //     options3: ["v", "nv"],
// //   };
// //   const priceArray = {
// //     price1: [0, 10, 20],
// //     price2: [0, 15, 30],
// //     price3: [0, 20],
// //   };
// //   // console.log(Object.entries(options));
// //   const entriesArray = Object.entries(options);
// //   // [
// //   //   [ 'options1', [ 's', 'm', 'l' ] ],
// //   //   [ 'options2', [ 'c', 'cb', 'xc' ] ]
// //   // ]
// //   const entriesValues = entriesArray.map((el, index) => el[1]);
// //   console.log(entriesValues,"values");
// //   // search value of ip array elements in entries values array index to index
// //   const arrayIndex = entriesValues.map((el, index) => {
// //     if (el.includes(optionsArray[index])) {
// //       return el.indexOf(optionsArray[index]);
// //     }
// //   });
// //   console.log(arrayIndex, "arrayIndex");
// //   const priceEntriesArray = Object.entries(priceArray);
// //   const priceEntriesValues = priceEntriesArray.map((el, index) => {
// //     return el[1];
// //   });
// //   console.log(priceEntriesValues);
// //   const priceArrayMapped = priceEntriesValues.map((el, index) => {
// //     return el[arrayIndex[index]];
// //   });
// //   console.log(priceArrayMapped);
// //   console.log([price, ...priceArrayMapped].reduce((a, b) => a + b, 0));
// // };
// // calcPrice(100, ["m", "cb", "v"]);

// // const someObj = {
// //   g: 1,
// //   f: 2,
// //   c: 3,
// // };
// // console.log(Object.entries(someObj));
// const titles = {
//   title1: " this is title 1",
//   title2: " this is title 2",
//   title3: " this is title 3",
// };
// const description = {
//   desc1: " this is description 1",
//   desc2: " this is description 2",
//   desc3: " this is description 3",
// };
// const options = {
//   flavour: ["flav1", "flav2", "flav3"],
//   size: ["size1", "size2", "size 3"],
//   brand: ["brand1", "brand2", "brand 3"],
// };
// const price = {
//   flavour: [2000, 3000, 2500],
//   size: [300, 500, 700],
//   brand: [3000, 5000, 6000],
// };

// console.log(Object.entries(options)); //[ 'flavour', 'size', 'brand' ]
// const ret=Object.entries(options).reduce((acc, el, index, array) => {
//   const priceKey = el[0];
//   const priceValue = el[1][1]; // !this should be set dynamic
  
//   return { ...acc ,[`${priceKey}`]:Object.values(options)[index].indexOf(priceValue)};
// }, {});
// console.log(ret)
// Object.keys(price).forEach((el,index)=>{
//   console.log(price[Object.keys(ret)[index]][Object.values(ret)[index]])
  

// })


// // const titleArray = Object.entries(titles).map((el, index) => el[1]);
// // const descArray = Object.entries(description).map((el, index) => el[1]);
// // titleArray.forEach((el, index, array) => {
// //   console.log({ array });
// //   console.log(`${el}=>${descArray[index]}`);
// // });
const obj1={
    a:[1,2,3],
    b:2,
    c:3,
    
};
const obj2={
    ...obj1,
   
    
    // a:[1,2,3]  => //!with this console.log(obj1.a===obj2.a) would have returned false
}

//? when we spread an object...the memory ref of the props are preserved inside the new obj
//? how ever over riding the props with new js obj will give them a new mem ref

//* on contrary obj1 === obj2 will always return false since they have different mem ref 
//* ..but their props may have same mem ref and not have same mem ref (if overrided)

//! reducers implement immutiblity for better testing and debugging ..the whole point of making a new obj
//! is to not mutate a var/obj in mem ref...thus we might return a new obj with same mem ref but without 
//! mutation and it will be accepted by redux..or return a new obj by overriding var
//! reducers will not change states in store until there is a new mem ref for props or a new props altogether
//! therefore direct mutations wont help ..as the mem ref is  not changed
//! look to change the mem ref 
console.log(obj1===obj2)
