'use babel';

import AtomMarkpressView from './atom-markpress-view';
import markpress from 'markpress';
import { CompositeDisposable, File } from 'atom';

export default {

  atomMarkpressView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomMarkpressView = new AtomMarkpressView(state.atomMarkpressViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomMarkpressView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markpress:toggle-preview': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markpress:generate': () => this.generate()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markpress:configure': () => this.configure()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomMarkpressView.destroy();
  },

  serialize() {
    return {
      atomMarkpressViewState: this.atomMarkpressView.serialize()
    };
  },

  toggle() {
    console.log('AtomMarkpress was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  generate() {
    let editor = atom.workspace.getActiveTextEditor();
    if (editor){
      const path = editor.getPath();
      const destPath = path.replace(/\..+/g, '.html');
      const file = new File(destPath);
      markpress(path).then((html) => file.writeSync(html));
    }
  },

  configure() {
    console.log('AtomMarkpress -> Configure()');
    return true;
  }

};
