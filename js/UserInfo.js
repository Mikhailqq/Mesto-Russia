class UserInfo {
	  	constructor(infoName, infojob) {
  		this.infoName = infoName;
  		this.infojob = infojob;
  		this.fullName = '';
  		this.userJob = '';
  	}

	setUserInfo(newName, newJob) {
		this.fullName = newName;
  		this.userJob = newJob;
	}

	updateUserInfo = () => {
		this.infoName.textContent = this.fullName;
  		this.infojob.textContent = this.userJob;
	}

	getUserInfo = () => {
		return {
			name: this.fullName,
			job: this.userJob,
		};
	}
}
