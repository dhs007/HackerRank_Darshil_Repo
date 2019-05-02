var VALUE = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var COLOR = 4;
var WIDTH = 5;
var RED = 0;
var BLACK = 1;
var MIN_SIZE = 4;
var RBTree = function(cmp) {
    if (cmp === undefined) {
	cmp = function(a, b) {
	    if (a < b) {
		return -1;
	    }
	    if (a > b) {
		return 1;
	    }
	    return 0;
	};
    }    
    this.cmp = cmp;
    this.nodes = [];
    this.size = 0; // total used and unused nodes
    this.next = null; //head of linked list of unused nodes
    this.count = 0; // number of used nodes
    this.root = null //the root index node
};

RBTree.prototype.resize = function(new_size) {
    if (new_size > this.size) {
	var min_i = this.nodes.length;
	var i = new_size * WIDTH;
	var next = this.next;
	this.nodes.length = i;	
	while (i > min_i) {
	    i -= WIDTH;
	    this.nodes[i] = next;
	    next = i;
	}
	this.next = next;
	this.size = new_size;
    } else {
    }
}

RBTree.prototype.insert = function(x) {
    if (this.count >= this.size) {
	if (this.size < MIN_SIZE ) {
	    this.resize(MIN_SIZE);
	} else {
	    this.resize(this.size*2);
	}
    }
    var idx = this.next;
    this.next = this.nodes[idx];
    this.nodes[idx+VALUE] = x;
    this.nodes[idx+LEFT] = null;
    this.nodes[idx+RIGHT] = null;
    this.nodes[idx+COLOR] = RED;
    this.count++;
    if (this.root === null) {
	this.nodes[idx+UP] = null;
	this.root = idx;
    } else {
	var parent = this.root;
	while (true) {
	    if (this.cmp(x,this.nodes[parent+VALUE]) < 0) {
		var leaf = this.nodes[parent+LEFT];
		if (leaf == null) {
		    this.nodes[parent+LEFT] = idx;
		    this.nodes[idx+UP] = parent;
		    break;
		} else {
		    parent = leaf;
		}
	    } else {
		var leaf = this.nodes[parent+RIGHT];
		if (leaf == null) {
                    this.nodes[parent+RIGHT] = idx;
                    this.nodes[idx+UP] = parent;
                    break;
                } else {
                    parent = leaf;
		}
	    }
	}
    }
    this.fix_coloring_near(idx);
};

RBTree.prototype.fix_coloring_near = function(idx) {
    var parent = this.nodes[idx+UP];
    if (parent == null) {
	this.nodes[idx+COLOR] = BLACK;
    } else if (this.nodes[parent+COLOR] == RED) {
	var gramps = this.nodes[parent+UP];
	var uncle  = gramps;
	var g_dir;
	if (this.nodes[gramps+LEFT] == parent) {
	    g_dir = LEFT;
	    uncle = this.nodes[gramps+RIGHT];
	} else {
	    g_dir = RIGHT;
	    uncle = this.nodes[gramps+LEFT];
	}
	var uncle_color = BLACK;
	if (uncle !== null) {
	    uncle_color = this.nodes[uncle+COLOR];
	}
	if (uncle_color == RED) {
	    this.nodes[uncle+COLOR] = BLACK;
	    this.nodes[parent+COLOR] = BLACK;
	    this.nodes[gramps+COLOR] = RED;
	    this.fix_coloring_near(gramps);
	} else {
	    if (this.nodes[parent+g_dir] !== idx) {
		var p_dir = LEFT+RIGHT-g_dir;
		var child = this.nodes[idx+g_dir];
		this.nodes[parent+p_dir] = child;
		if (child !== null) {
		    this.nodes[child+UP] = parent;
		}
		this.nodes[idx+g_dir] = parent;
		this.nodes[parent+UP] = idx;		
		this.nodes[gramps+g_dir] = idx;
		this.nodes[idx+UP] = gramps;
		idx = parent;
		parent = this.nodes[parent+UP];
	    }
	    this.nodes[gramps+COLOR] = RED;
	    this.nodes[parent+COLOR] = BLACK;
	    var c_dir = LEFT+RIGHT-g_dir;
	    var child = this.nodes[parent+c_dir];
	    this.nodes[gramps+g_dir] = child;
	    if (child !== null) {
		this.nodes[child+UP] = gramps;
	    }
	    var ggramps = this.nodes[gramps+UP];
	    if (ggramps === null) {
		this.nodes[parent+UP] = null;
		this.root = parent;
	    } else {
		if (this.nodes[ggramps+LEFT] === gramps) {
		    this.nodes[ggramps+LEFT] = parent;
		} else {
		    this.nodes[ggramps+RIGHT] = parent;
		}
		this.nodes[parent+UP] = ggramps;
	    }

	    this.nodes[parent+c_dir] = gramps;
	    this.nodes[gramps+UP] = parent;
	}
    }
};

RBTree.prototype.remove = function(idx) {
    if (this.nodes[idx+LEFT] !== null && this.nodes[idx+RIGHT] !== null) {
	var single_parent = this.nodes[idx+RIGHT];
	while (this.nodes[single_parent+LEFT] !== null) {
	    single_parent = this.nodes[single_parent+LEFT];
	}
	this.nodes[idx+VALUE] = this.nodes[single_parent+VALUE];
	idx = single_parent;
    }
    var parent = this.nodes[idx+UP];
    if (this.nodes[idx+COLOR] === RED) {
	if (this.nodes[parent+LEFT] === idx) {
	    this.nodes[parent+LEFT] = null;
	} else {
	    this.nodes[parent+RIGHT] = null;
	}
    } else {
	var child = this.nodes[idx+LEFT];
	if (child === null) {
	    child = this.nodes[idx+RIGHT];
	}
	if (child !== null) {
	    this.nodes[child+COLOR] = BLACK;
	    if (parent === null) {
		this.nodes[child+UP] = null;
		this.root = child;
	    } else {
		if (this.nodes[parent+LEFT] === idx) {
		    this.nodes[parent+LEFT] = child;
		} else {
		    this.nodes[parent+RIGHT] = child;
		}
		this.nodes[child+UP] = parent;
	    }
	} else {
	    if (parent === null) {
		this.root = null;
	    } else {
		if (this.nodes[parent+LEFT] === idx) {
		    this.nodes[parent+LEFT] = null;
		    this.fix_short_branch(parent, LEFT);
		} else {
		    this.nodes[parent+RIGHT] = null;
		    this.fix_short_branch(parent, RIGHT);
		}
	    }
	}
    }
    this.nodes[idx] = this.next;
    this.next = idx;
    this.count--;
};

RBTree.prototype.fix_short_branch = function(idx, short_dir) {
    var long_dir = LEFT+RIGHT-short_dir;
    var short_child = this.nodes[idx+short_dir];
    var long_child = this.nodes[idx+long_dir];
    if (this.nodes[long_child+COLOR] === RED) {
	this.nodes[long_child+COLOR] = BLACK;
	this.nodes[idx+COLOR] = RED;
	var kid = this.nodes[long_child+short_dir];
	var gramps = this.nodes[idx+UP];
	if (gramps === null) {
	    this.root = long_child;
	} else {
	    if (this.nodes[gramps+LEFT] === idx) {
		this.nodes[gramps+LEFT] = long_child;
	    } else {
		this.nodes[gramps+RIGHT] = long_child;
	    }
	}
	this.nodes[long_child+UP] = gramps;	
	this.nodes[long_child+short_dir] = idx;
	this.nodes[idx+UP] = long_child;
	this.nodes[idx+long_dir] = kid;
	this.nodes[kid+UP] = idx;
	long_child = kid;
    }
    var long_long = this.nodes[long_child+long_dir];
    var long_short = this.nodes[long_child+short_dir];
    var long_long_color = BLACK;
    if (long_long !== null && this.nodes[long_long+COLOR] === RED) {
	long_long_color = RED;
    }
    var long_short_color = BLACK;
    if (long_short !== null && this.nodes[long_short+COLOR] === RED) {
	long_short_color = RED;
    }
    if (this.nodes[idx+COLOR] === BLACK && long_long_color === BLACK && long_short_color === BLACK) {
	this.nodes[long_child+COLOR] = RED;
        var gramps = this.nodes[idx+UP];
        if (gramps === null) {
        } else {
            if (this.nodes[gramps+LEFT] === idx) {
		this.fix_short_branch(gramps,LEFT);
            } else {
		this.fix_short_branch(gramps,RIGHT);
            }
	}
    } else if (this.nodes[idx+COLOR] === RED && long_long_color === BLACK && long_short_color === BLACK) {
	this.nodes[long_child+COLOR] = RED;
	this.nodes[idx+COLOR] = BLACK;
    } else {
	if (long_long_color === BLACK) {
	    this.nodes[long_child+COLOR] = RED;
	    this.nodes[long_short+COLOR] = BLACK;	    
	    var kid = this.nodes[long_short+long_dir];
	    if (kid === null) {
		this.nodes[long_child+short_dir] = null;
	    } else {
		this.nodes[long_child+short_dir] = kid;
		this.nodes[kid+UP] = long_child;
	    }	    
	    this.nodes[long_short+long_dir] = long_child;
	    this.nodes[long_child+UP] = long_short;
	    this.nodes[idx+long_dir] = long_short;
	    this.nodes[long_short+UP] = idx;
	    long_long = long_child;
	    long_child = long_short;
	}
	this.nodes[long_child+COLOR] = this.nodes[idx+COLOR];
	this.nodes[idx+COLOR] = BLACK;
	this.nodes[long_long+COLOR] = BLACK;
	var gramps = this.nodes[idx+UP];
	var kid = this.nodes[long_child+short_dir];
        if (gramps === null) {
            this.root = long_child;
        } else {
            if (this.nodes[gramps+LEFT] === idx) {
                this.nodes[gramps+LEFT] = long_child;
            } else {
                this.nodes[gramps+RIGHT] = long_child;
            }
        }
        this.nodes[long_child+UP] = gramps;

        this.nodes[long_child+short_dir] = idx;
        this.nodes[idx+UP] = long_child;

	if (kid === null) {
	    this.nodes[idx+long_dir] = null;
	} else {
	    this.nodes[idx+long_dir] = kid;
	    this.nodes[kid+UP] = idx;
	}
    }
};

RBTree.prototype.pop_min_over_x = function(x) {
    var best_idx = null;
    var best_value;
    var idx = this.root;
    while (idx !== null) {
	var value = this.nodes[idx+VALUE];
	if (this.cmp(value,x) > 0) {
	    best_idx = idx;
	    best_value = value;
	    idx = this.nodes[idx+LEFT];
	} else {
	    idx = this.nodes[idx+RIGHT];
	}
    }
    if (best_idx !== null) {
	this.remove(best_idx);
    }
    return best_value;
}

var offset = 20000000000;
function processData(input) {
    var lines = input.split('\n');
    var n = Number(lines.shift());
    var nodes = lines.shift().split(' ');    
    var counts = nodes.reduce((acc,i) => {
        if (acc[i] === undefined ) {
            acc[i] = 1;
        } else {
            acc[i]++;
        }
        return acc;
    },{});    
    var levels = {};
    var max_level = 0;
    var uniq_count = 0;
    for (var a in counts) {
        if (counts.hasOwnProperty(a)) {
            let level = counts[a];
            if (levels[level] === undefined) {
                levels[level] = new RBTree();
                levels[level].insert(Number(a));
            } else {
                levels[level].insert(Number(a));
            }
            uniq_count++;
            if (max_level < level) {
                max_level = level;
            }
        }
    }
    var level = max_level;
    if (uniq_count == n && Math.pow(2,level-1) == n && nodes.length == (2*n-1)) {
        var tree = new Array(nodes.length);
        var good = true;
        var cur_level = levels[level];
        tree[0] = cur_level.nodes[cur_level.root+VALUE];
        counts[tree[0]]--;
        var p = 0;
        var i = 1;
        while (i<nodes.length) {
            var parent = tree[p];
            p++;
            if (level > counts[parent]) {
                level = counts[parent];
                cur_level = levels[level];
            }
            
            tree[i] = parent;
            counts[parent]--;
            i++;
            
            var val = cur_level.pop_min_over_x(parent);
            if (val === undefined) {
                good = false;
                break;
            } else {
                tree[i] = val;
                counts[val]--;
                i++;
            }
        }
        if (good) {
            console.log('YES');
            console.log(tree.join(' '));
        } else {
            console.log('NO');        
        }
    } else {
        console.log('NO');        
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});