'use babel';

import AtomMarkpressView from './atom-markpress-view';
import { CompositeDisposable } from 'atom';

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

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markpress:toggle': () => this.toggle()
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
  }

};
