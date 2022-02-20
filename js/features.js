const features = [
  {
    display: `reach to unlock rockets`,
    progress() {
      return player.m.distance.add(1).log10().div(new Decimal(5e4).log10())
    },
    unlocked() { 
      return player.ro.unlocked 
    }
  }
]