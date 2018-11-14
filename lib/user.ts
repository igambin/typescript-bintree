import { IUser } from "./i-user";
import { ISortable } from "./i-sortable";

export class User implements IUser, ISortable<User> {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public key(): string {
        return `${this.name}${this.age}`;
    }
    public compare(to: User): number {
        if (this.key() < to.key()) {
            return -1;
        }
        if (this.key() > to.key()) {
            return 1;
        }
        return 0;
    }
}