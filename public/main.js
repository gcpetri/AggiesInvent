// file to put the functional app
Vue.component('home-page', {
    template: `<div class="home-page">
                    <div><a class="hp-header">S E C U R E&nbsp&nbsp&nbsp&nbspC O L L A B</a></div></br>
                    <div><a class="hp_desc">One-stop for Efficient NSA Security Analysts communications & work space platform</a></div>
                    <div class="cowboy-background"></div>
                </div>`
    }
)
Vue.component('task-page', {
	template: `<div class="task-page">
                    <div id="myDIV" class="header">
                        <h2>Task List</h2></br>
                        <input type="text" id="myInput" class="input" placeholder="New Task...">
                        <span @click="newElement()" class="addBtn">Add</span>
                    </div>
                    <ul id="myUL" class="task-list">
                        <li v-for="(items, idx) in this.$root.task_items" @click="makeChecked(idx)" v-bind:class="{checked: items.done}" style="text-align: left;">
			    {{ items.task }}
			</li>
                    </ul>
                </div>`,
    data: function() {
        return { 
        };
    },
    methods: {
        newElement: function() {
            var Task = document.getElementById('myInput').value;
            this.$root.task_items.push({task: Task, done: false});
        },
        makeChecked: function(item) {
	    this.$root.task_items[item].done = true;
            console.log(this.$root.task_items[item].task);
        }
    }
})
Vue.component('assessment-page', {
    template: `<div class="assessment-page">
                    <div class="page-title"><a class="page-title-text">My Jobs</a></div>
                    <div class="add-button" @click="addModule()"><img src="add.png"/></div>
                    <ul>
                        <li v-for="item in this.$root.modules"><componenet :is="item"></componenet></li>
                    </ul>
                </div>`,
    methods: {
        addModule: function() {
            this.$root.modules.push(Module);
        }
    }
})
let Module = {
    template: `<div class="module">
                    <div @click="inputTitle()" class="module-title"><input type="text" id="ModuleInput" class="input" placeholder="Title..."></div>
                    </br></br></br></br>
                    <div v-show="showOpen" @click="openModule()" class="open-module">Open Module</div>
                </div>`,
    data: function() {
        return {showOpen: false}
    },
    methods: {
        openModule: function() {
            this.$root.module_page=true;
            this.$root.assessment_job_page=false;
        },
        inputTitle: function() {
            this.showOpen=true;
        }
    }
}
Vue.component('module-page', {
	template: `<div class="module-page" style="overflow: auto;">
                    <div class="close-button"><img @click="closePage" src="close2.png"/></div>
                    <div class="title" @click="moduleTitle()"><b>{{ this.Module_title }}</b></div>
                    <div class="search-header">Search Databases</div>
		    <div class="search-bar">
		    	<input type="text" id="SearchText" class="input" placeholder="Query">
			<button type="submit" @click="runSearch()"><i class="fa fa-search"></i> Search</button>
		    </div>
		    <br>
		    <div id="results">
		    	<li class="list-items" v-for="item in this.$root.cards" style="list-style: none;"><a v-bind:href=item.url target="_blank">{{ item.name }}</a></li>
		    </div>
                </div>
    `,
    data: function() {
        return { Module_title: "Hello" };
    },
    methods: {
        moduleTitle: function() {
            var Title=document.getElementById("ModuleInput").value;
            this.Module_title = Title;
        },
        closePage: function() {
            this.$root.assessment_job_page = true;
            this.$root.module_page = false;
        },
	makeCards: function(data) {
	},
	runSearch: function() {
	    this.$root.cards = [];
            var query=document.getElementById("SearchText").value;
	    var response = null;
	    $.ajax({
	        url: 'https://api.datacowboy.ml/search?query='.concat(query),
		async: false,
		dataType: 'json',
		success: function (json) {
		    response = json;
		}
	    });
	    console.log(response);
	    var i = 1;
	    for (hash in response) {
		this.$root.cards.push({name: "Result #".concat(i), url: "https://api.datacowboy.ml/req?hash=".concat(response[hash])});
		i++;
	    }
	}
    }
})
Vue.component('groups-page', {
    template: `<div class="groups-page">
                    <div class="groups-title">My Groups</div>
                    <div class="dropdown">
                        <button class="dropbtn" @mouseover="dropDown()">Groups<i class="fa fa-angle-down" style="margin-left: 1em;"></i></button>
                        <div v-show="showDropDown" class="dropdown-content">
                            <a @click="moveGroup('Fort')">NSA Security Analyists - Fort Meade</a>
                            <a @click="moveGroup('Texas')">NSA Security Analyists - Texas Headquarters</a>
                        </div>
                    </div>
                    <div class="group-info">
                        <div v-show="show1" class="fort">
                            <div class="fort-title">NSA Security Analyists - Fort Meade</div>
                            <div class="group-descriptions">
                                <a>Members:</a></br>
                                <ul>
                                    <li class="group-member">John Doe</li>
				    <hr>
                                    <li class="group-member">Alicia Frank</li>
				    <hr>
                                    <li class="group-member">Alfred Smith</li>
				    <hr>
                                    <li class="group-member">Kirthivel Ramesh</li>
                                </ul>
                            </div>
                        </div>
                        <div v-show="show2" class="texas">
                            <div class="texas-title">NSA Security Analyists - Texas Headquarters</div>
                            <div class="group-descriptions">
                                <a>Members:</a></br>
                                <ul>
                                    <li class="group-member">Jane Doe</li>
				    <hr>
                                    <li class="group-member">Devin Franks</li>
				    <hr>
                                    <li class="group-member">Nancy Petri</li>
				    <hr>
                                    <li class="group-member">Marc Choucair</li>
				    <hr>
                                    <li class="group-member">Ben Halpert</li>
				    <hr>
                                    <li class="group-member">Greg Jean</li>
                                </ul>
                            </div>
                        </div>
                        <a v-show="waiting">Group Content...</a>
                    </div>
                </div>`,
    data: function() {
        return { showDropDown: false, waiting: true, show1: false, show2: false }
    },
    methods: {
        dropDown: function() {
            this.showDropDown=true;
        },
        moveGroup: function(place) {
            if (place == 'Fort') { return this.show1=true, this.show2=false, this.waiting=false, this.showDropDown=false }
            else if (place == 'Texas') { return this.show1=false, this.show2=true, this.showDropDown=false, this.waiting=false }
        }
    }
})
Vue.component('alert-page', {
    template: `<div class="alert-page">
                    <div class="alerts-title"><b>Alerts</b></div>
                    <div class="alerts-list">
                        <a>National Alerts</a>
                        <ul>
                            <li> &#8226 20-09-19 06:37:43 CIA::Refuge Influx</li>
                            <li> &#8226 20-09-19 06:34:33 CIA::Riots</li>
                            <li> &#8226 20-08-19 05:31:08 TSA::Member accessed your module Zimbabwe</li>
                            <li> &#8226 20-09-19 05:09:49 CIA::Urgent Explosives Intelligence</li>
                            <li> &#8226 20-08-19 01:31:34 CIA::Member accessed your module Zimbabwe</li>
                            <li> &#8226 20-08-19 01:31:00 DOD::</li>
                            <li> &#8226 20-08-19 01:31:08 STATE::Member accessed your module Zimbabwe</li>
                            <li> &#8226 20-08-19 00:41:59 FBI::Member accessed your module Zimbabwe</li>
                            <li> &#8226 20-08-18 07:38:18 TIA::Member accessed your module Zimbabwe</li>
                            <li> &#8226 20-08-18 07:31:08 TSA::Member accessed your module Iraq</li>
                            <li> &#8226 20-08-17 01:31:56 TSA::Member accessed your module Zimbabwe</li>
                        </ul>
                    </div>
                    <div class="alerts-list">
                        <a>Project Alerts</a>
                        <ul>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Zimbabwe</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Iraq</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Zimbabwe</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Zimbabwe</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Zimbabwe</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                            <li> &#8226 20-09-16 06:37:43 John Doe added file with your tag Iraq</li>
                            <li> &#8226 20-07-25 09:23:47 John Deer searched file with your tag Zimbabwe</li>
                            <li> &#8226 20-06-28 10:51:12 Jane Deer started module with your title </li>
                        </ul>
                    </div>
                </div>`,
    data: function() {
        return { showUrgent: false, showCollab: false}
    },
})
Vue.component('nav-bar', {
    template: `<div class="nav-bar">
                    <ul>
                        <li @click="nav_func('home')" v-bind:class="{active: nav_home2}"><a href="#home"><b>Home</b></a></li>
                        <li @click="nav_func('task')" v-bind:class="{active: nav_tasks2}"><a href="#tasks"><b>Tasks</b></a></li>
                        <li @click="nav_func('assessment')" v-bind:class="{active: nav_jobs2}"><a href="#jobs"><b>Jobs</b></a></li>
                        <li @click="nav_func('groups')" v-bind:class="{active: nav_groups2}"><a href="#groups"><b>Groups</b></a></li>
                        <li @click="nav_func('alert')" v-bind:class="{active: nav_alerts2}"><a href="#alerts"><b>Alerts</b></a></li>
                    </ul>
                </div>`,
    data: function() {
        return {
            nav_home2: true,
            nav_tasks2: false,
            nav_jobs2: false,
            nav_groups2: false,
            nav_alerts2: false,
        }
    },
    methods: {
        nav_func: function(page) {
            if (page == 'home') {return this.$root.home_page=true, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=true,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'task') {return this.$root.home_page=false, this.$root.task_page=true, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=true,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'assessment') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=true, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=true,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'groups') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=true, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=true,this.nav_alerts2=false}
            else if (page == 'alert') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=true, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=true}
        }
}});
var app = new Vue({
    el: '#app',
    data: {
        home_page: true,
        task_page: false,
        assessment_job_page: false,
        groups_page: false,
        alert_page: false,
        task_items: [
        ],
        modules: [

        ],
        module_page: false,
	cards: [
	],
    }
});
