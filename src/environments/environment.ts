// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
  ,name: 'Development'
  ,firebaseConfig: {
		apiKey: "AIzaSyBWADn6B5T7XkKzQn-g44hl5W7uACeOs38",
		authDomain: "groovytask-dev.firebaseapp.com",
		databaseURL: "https://groovytask-dev.firebaseio.com",
		storageBucket: "groovytask-dev.appspot.com",
		messagingSenderId: "288386457025"
  }
};
