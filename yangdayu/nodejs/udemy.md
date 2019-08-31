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

* readFileSync、writeFileSync

		const fs = require('fs');

		var fetchNotes = () => {
			try {
				var notesString = fs.readFileSync('notes-data.json');
				return JSON.parse(notesString);
			} catch (e) {
				return [];
			}
		};

		var saveNotes = (notes) => {
			fs.writeFileSync('notes-data.json', JSON.stringify(notes));
		};

		var addNote = (title, body) => {
			var notes = fetchNotes();
			var note = {
				title,
				body
			};
			var duplicateNotes = notes.filter((note) => note.title === title);

			if (duplicateNotes.length === 0) {
				notes.push(note);
				saveNotes(notes);
				return note;
			}
		};

		var removeNote = (title) => {
			var notes = fetchNotes();
			var filteredNotes = notes.filter((note) => note.title !== title);
			saveNotes(filteredNotes);

			return notes.length !== filteredNotes.length;
		};