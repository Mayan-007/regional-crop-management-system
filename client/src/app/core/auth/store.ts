import { computed, Injectable, signal } from "@angular/core";
import { AuthUser } from "./models";

@Injectable({
    providedIn: 'root'
})
export class Store {
    private readonly _user = signal<AuthUser | null>(null);
    private readonly _loading = signal(false);

    readonly user = this._user.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly authenticated = computed(() => !!this._user());
    readonly role = computed(() => this._user()?.role);

    setUser(user: AuthUser): void {
        this._user.set(user);
    }

    clearUser(): void {
        this._user.set(null);
    }

    setLoading(value: boolean): void {
        this._loading.set(value);
    }
}