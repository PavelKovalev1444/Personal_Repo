const Taken = require('./taken')
const BEFORE_ACTION = "beforeAction"
const Manager = {
  setHear(input){
    Taken.setHear(input)
  },
  getAction(input, ta, team, side){
    let taken = Taken.setSee(input, team, side)
    this.incTmers(taken, ta)
    if(ta.actions[BEFORE_ACTION]){
      ta.actions[BEFORE_ACTION](taken, ta.state)
    }
    return this.execute(taken, ta)
  },
  incTimers(taken, ta) {
    if(!this.lastTime){
      this.lastTime = 0
    }
    if(taken.time > this.lastTime) {
      this.lastTime = taken.time
      for(let key in ta.state.timers){
        ta.state.timers[key] = ta.state.timers[key] + 1
      }
    }
  },
  execute(taken, ta){
    if(ta.state.synch){
      let cond = ta.state.synch.substr(0, ta.state.synch.length - 1)
      return ta.actions[cond](taken, ta.state)
    }
    if(ta.state.next){
      if(ta.nodes[ta.current]){
        return this.nextState(taken, ta)
      }
      if(ta.edges[ta.current]){
        return this.nextEdge(taken, ta)
      }
    }
    if(ta.nodes[ta.current]){
      return this.executeState(taken, ta)
    }
    if(ta.edges[ta.current]){
      return this.executeEdge(taken, ta)
    }
    throw `Unexpected state: ${ta.current}`
  },
  nextState(taken, ta){
    let node = ta.nodes[ta.current]
    for(let name of node.e) {
      let edgeName = `${node.n}_${name}`
      let edge = ta.edges[edgeName]
      if(!edge){
        throw `Unexpected edge: ${node.n}_${name}`
      }
      for(let e of edge){
        if(e.guard){
          let guard = true
          for(let g of e.guard){
            if(!this.guard(taken, ta, g)){
              guard = false
              break
            }
          }
          if(!guard){
            continue
          }
        }
        if(e.synch){
          if(e.synch.endsWith("?")) {
            let cond = e.synch.substr(0, e.synch.length - 1)
            if(!ta.actions[cond]){
              throw `Unexpected synch: ${e.synch}`
            }
            console.log(`Synch[${taken.time}]: ${e.synch}`)
            if(!ta.actions[cond](taken, ta.state)){
              continue
            }
          }
        }
        ta.current = edgeName
        ta.state.next = false
        return this.execute(taken, ta)
      }
    }
  },
  nextEdge(taken, ta){
    let arr = ta.current.split("_")
    let node = arr[1]
    ta.current = node
    ta.state.next = false
    return this.execute(taken, ta)
  },
  executeState(taken, ta){
    let node = ta.nodes[ta.current]
    if(ta.actions[node]) {
      let action = ta.actions[node](taken, ta.state)
      if(!action && ta.state.next){
        return this.execute(taken, ta)
      }
      return action
    }else{
      ta.state.next = true
      return this.execute(taken, ta)
    }
  },
  executeEdge(taken, ta){
    let edges = ta.edges[ta.current]
    for(let e of edges){
      if(e.guard){
        let guard = true
        for(let g of e.guard){
          if(!this.guard(taken, ta, g)){
            guard = false
            break
          }
        }
        if(!guard){
          continue
        }
      }
      if(e.assign){
        for(let a of e.assign){
          if(a.type === "timer"){
            if(!ta.state.timers[a.n]){
              throw `Unexpected timer: ${a}`
            }
            ta.state.timers[a.n] = a.v
          }else {
            if(!ta.state.variables[a.n]){
              throw `Unexpected variable: ${a}`
            }
            ta.state.variables[a.n] = a.v
          }
        }
      }
      if(e.synch){
        if(!e.synch.endsWith("?") && !e.synch.endsWith("!")){
          throw `Unexpected synch: ${e.synch}`
        }
        if(e.synch.endsWith("!")){
          let cond = e.synch.substr(0, e.synch.length - 1)
          if(!ta.actions[cond]){
            throw `Unexpected synch: ${e.synch}`
          }
          return ta.actions[cond](taken, ta.state)
        }
      }
    }
    ta.state.next = true
    return this.execute(taken, ta)
  },
  guard(taken, ta, g){
    function taStateObject(o, ta){
      if(typeof o == "object"){
        return o.v ? ta.state.variables[o.v] : ta.state.timers[o.t]
      }else{
        return o
      }
    }
    function lt(ta, l, r){
      return taStateObject(l, ta) < ta.state.Object(r, ta)
    }
    throw `Unexpected guard: ${JSON.stringify(g)}`
  }
}