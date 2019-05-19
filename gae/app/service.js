import fetch from './utils/fetch';

export function getExams() {
	return fetch(`/exams`, {
		method: 'GET'
	}).then(b => b.json());
}

export function addExam(exam) {
	return fetch(`/exams`, {
		method: 'POST',
		body: JSON.stringify(exam)
	}).then(b => b.json());
}

export function removeExam(id) {
	return fetch(`/exams/${id}`, {
		"method": "DELETE"
	})
}

export function getStudents() {
	return fetch(`/students`, {
		method: 'GET'
	}).then(b => b.json());
}

export function removeStudent(id) {
	return fetch(`/students/${id}`, {
		method: 'DELETE'
	})
}

export function setStudent(student) {
	return fetch(`/students`, {
		method: 'PUT',
		body: JSON.stringify(student)
	});
}