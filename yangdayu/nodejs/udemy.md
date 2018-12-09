#### udemy

* process

		var command = process.argv[2];
		if (command === 'add') {
			console.log('Adding new note')
		} else if (command === 'list') {
			console.log('Listing all notes')
		} else {
			console.log('Removing note')
		}
		
		node app.js remove --title=secrets // command: remove  removing note
		
	
		const fs = require('fs');

		var originalNote = {
		  title: 'Some title',
		  body: 'Some body'
		};
		var originalNoteString = JSON.stringify(originalNote);
		fs.writeFileSync('notes.json', originalNoteString);
		
		var noteString = fs.readFileSync('notes.json');
		var note = JSON.parse(noteString);
		console.log(typeof note);
		console.log(note.title);