export class Person {
  public readonly name: string
  constructor(props) {
    this.name = props.name
  }
  public wave = () => console.log(`Person ${this.name} waved!`)
}

export class Pet {
  public readonly name: string
  constructor(props) {
    this.name = props.name
  }
  public sit = () => console.log(`Pet ${this.name} sat down!`)
}

// export class PersonOrPet implements class<T extends  Pet | Person> {
//   public readonly name: string
//   public readonly type: string

//   constructor(props) {
//     switch (props.type) {
//       case 'person':
//         this.prototype.this = Person
//         super(props)
//     }
//     this.name = props.name
//   }
// }
