import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './states/app.state';
import { NgxsStoragePluginModule, NgxsStoragePluginOptions, StorageOption } from '@ngxs/storage-plugin';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GameComponent } from './components/game/game.component';
import { GameOverComponent } from './components/overlays/game-over/game-over.component';
import { StartGameComponent } from './components/overlays/start-game/start-game.component';
import { SettingsComponent } from './components/overlays/settings/settings.component';
import { ButtonComponent } from './components/presentational/button/button.component';
import { TextComponent } from './components/presentational/text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameOverComponent,
    StartGameComponent,
    SettingsComponent,
    ButtonComponent,
    TextComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState]),
    NgxsStoragePluginModule.forRoot({
      key: ['app'], // The key under which your state will be stored in localStorage
      storage: StorageOption.LocalStorage, // The type of storage to use (e.g. LocalStorage, SessionStorage)
    } as NgxsStoragePluginOptions),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
