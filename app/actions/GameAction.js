import game from '../stores/GameStore';

class GameAction {

  startGame() {
    game.emitGameStart();
    const scene = game.items.filter(_ => !_.complete).first();
    if (scene) {
      game.scene = scene.id;
      game.emitSceneStart();
    } else {
      game.emitGameComplete();
    }
  }

  _getCurrentNumber(scene) {
    return game.items.reduce((result, _) => {
      if (_.id === scene) {
        return _.recepts.reduce((find, recept) => {
          if (recept.id === _.recept) {
            return recept.number;
          } else {
            return find;
          }
        }, 1);
      } else {
       return result;
      }
    }, 1);
  }

  _sort(a, b, currentNumber) {
    if (a.number < currentNumber && b.number < currentNumber) {
      if (a.number === b.number) {
        return 0;
      } else {
        return (a.number < b.number) ? -1 : 1;
      }
    } else if(a.number >= currentNumber && b.number >= currentNumber) {
      if (a.number === b.number) {
        return 0;
      } else {
        return (a.number < b.number) ? -1 : 1;
      }
    } else if(a.number >= currentNumber && b.number < currentNumber) {
      return -1;
    } else if(a.number < currentNumber && b.number >= currentNumber) {
      return 1;
    } else {
      return 0;
    }
  }

  nextRecept(scene: string) {
    const currentNumber = this._getCurrentNumber(scene);
    let recept;
    game.items = game.items.map(_ => {
      if (_.id === scene) {
        recept = _.recepts.filter(_ => !_.complete)
          .sort((a,b) => this._sort(a, b, currentNumber))
          .filter(_ => currentNumber !== _.number).first();
        _.recept = (recept) ? recept.id : null;
      }
      return _;
    });
    game.emitChange();
    if (recept) {
      return recept.id;
    } else {
      return game.items.reduce((result, _) => (_.id === scene) ? _.recept: result, '');
    }
  }

  startRecept(scene: string) {
    const currentNumber = this._getCurrentNumber(scene);
    let recept;
    game.items = game.items.map(_ => {
      if (_.id === scene) {
        recept = _.recepts.filter(_ => !_.complete)
          .sort((a,b) => this._sort(a, b, currentNumber)).first();
        _.recept = (recept) ? recept.id : null;
      }
      return _;
    });
    game.emitChange();
    if (recept) {
      game.emitReceptStart();
      return recept.id;
    } else {
      $( document ).trigger( "scene-complete", [scene]);
      game.emitSceneComplete();
      return null;
    }
  }

  completeRecept(scene: string) {
    game.items = game.items.map(_ => {
      if (_.id === scene) {
        const id = _.recept;
        $( document ).trigger( "recept-complete", [id] );
        _.recepts.map(_ => {
          if (_.id === id) {
            _.complete = true;
          }
          return _;
        }).first();
      }
      return _;
    });
    game.emitChange();
    game.emitReceptComplete();
  }

}

export default new GameAction();
