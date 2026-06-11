import { inject, Injectable } from '@angular/core';
import { Api } from '../services/api';
import { Store } from './store';
import { Token } from './token';
import { AuthUser, LoginPayload, LoginResponse } from './models';
import { finalize, map, tap } from 'rxjs';
import { AUTH_STORAGE_KEYS } from './constants';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	private readonly api = inject(Api);
	private readonly store = inject(Store);
	private readonly token = inject(Token);

	login(payload: LoginPayload) {
		this.store.setLoading(true);

		return this.api
			.post<{ data: LoginResponse}>('auth/login', payload)
			.pipe(
                map(response => response.data),
				tap(response => {
					this.token.set(response.token);

                    console.log(response);

					localStorage.setItem(
						AUTH_STORAGE_KEYS.user,
						JSON.stringify(response.admin)
					);

					this.store.setUser(response.admin);
				}),

				finalize(() => {
					this.store.setLoading(false);
				})
			);
	}

	logout(): void {
		this.token.clear();

		localStorage.removeItem(AUTH_STORAGE_KEYS.user);

		this.store.clearUser();
	}

	restoreSession(): void {
		const user = localStorage.getItem(AUTH_STORAGE_KEYS.user);

		if(!user) {
			return;
		}

		this.store.setUser(JSON.parse(user));
	}

	get currentUser(): AuthUser | null {
		return this.store.user();
	}
}
