class ElapsedTime {
	dateBefore!: Date;
	dateAfter!: Date;

	before() {
		this.dateBefore = new Date();
	}

	after() {
		this.dateAfter = new Date();
	}

	get secondsPassed() {
		if (!this.dateBefore) {
			this.dateBefore = new Date();
		}

		if (!this.dateAfter) {
			this.dateAfter = new Date();
		}

		return parseFloat(
			(
				Math.abs(this.dateBefore.getTime() - this.dateAfter.getTime()) / 1000
			).toFixed(2)
		);
	}
}

export const elapsedTime = () => new ElapsedTime();
