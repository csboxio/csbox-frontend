<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {
		Input,
		Label, Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";
	import {goto, invalidateAll} from "$app/navigation";
	import {applyAction, deserialize} from "$app/forms";
	import {page} from "$app/stores";
	import {addNotification} from "../../../../../../../lib/utilities/notifications.js";

	export let data;
	let { supabase, claim } = data
	$: ({ supabase, claim } = data)
	let course_data = data.courseData;


	const questions = [
		{
			question: 'What is the output of the following code?',
			code: 'console.log(2 + 2);',
			options: ['2', '4', '22', 'NaN'],
			answer: '4',
			selectedOption: ''
		},
		{
			question: 'What does CSS stand for?',
			options: ['Cascading Style Sheets', 'Creative Style Selector', 'Computer Style System', 'None of the above'],
			answer: 'Cascading Style Sheets',
			selectedOption: ''
		},
		{
			question: 'Which programming language is commonly used for web development?',
			options: ['JavaScript', 'Python', 'Java', 'C++'],
			answer: 'JavaScript',
			selectedOption: ''
		},
	];

	let currentQuestion = 0;
	let score = 0;
	let quizCompleted = false;
	let quizScoreOutput = ""
	let quizzes;
	$: quizzes = data.quizzes;
	let addQuizModel = false;

	function nextQuestion() {
		if (currentQuestion < questions.length - 1) {
			currentQuestion++;
		}
		else {
			quizCompleted = true;
			showScore();
		}
	}

	function checkAnswer() {
		const { answer, selectedOption } = questions[currentQuestion];
		if (selectedOption === answer) {
			score++;
		}
		nextQuestion();
	}

	function showScore() {
		const percentage = (score / questions.length) * 100;
		quizScoreOutput = `Quiz completed! Your score is ${percentage}`;
	}

	function resetQuiz() {
		currentQuestion = 0;
		score = 0;
		questions.forEach(question => {
			question.selectedOption = '';
		});
	}

	function handleQuiz(id) {
		goto('/d/courses/' + data.slug + '/quizzes/' + id);
	}

	// For search box on assignments
	let searchTerm = '';
	$: filteredItems = quizzes.filter(
			(quizzes) => quizzes.quiz_title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);


	// For quiz delete
	let deleteModel = false;
	let delete_quiz_id;


	function delete_model_open(id) {
		delete_quiz_id = id;
		deleteModel = true;
	}

	function delete_model_close() {
		deleteModel = false;
	}

	async function handleDeleteQuiz(qid) {
		const { error, status } = await $page.data.supabase.from('quizzes').delete().match({ id: qid });
		console.log(status)
		if (status === 204) {
			const newNotification =
					{
						title: "Success! 🥳",
						message: `Deleted Quiz!`
					};
			addNotification(newNotification, supabase, $page.data.session.user)
			delete_model_close();
			await invalidateAll();
		}
	}

	async function handle_quiz_submit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
				'cache-control': 'max-age=3600'
			}
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			addQuizModel = false;
			await invalidateAll();
		}
		console.log(result)
		await applyAction(result);
	}

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
		// Reset quiz state when the component mounts
		resetQuiz();
	});
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container">

			{#if claim !== 'student'}

			<button
					class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
					on:click={() => addQuizModel = true}>
				<span
						class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Create
				</span>
			</button>
				{/if}
			<div>
				<div class="relative overflow-x-auto  sm:rounded-lg w-full">
					<TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
						<Table hoverable>
							<TableHead>
								<TableHeadCell>Quiz Title</TableHeadCell>
								<TableHeadCell>Due</TableHeadCell>
								<TableHeadCell>Points</TableHeadCell>
								<TableHeadCell>
									<span class="sr-only ">Edit</span>
								</TableHeadCell>
							</TableHead>
							<TableBody class="divide-y">
								{#key quizzes}
									{#each filteredItems as { id, quiz_title, quiz_doc, quiz_attempts, question_count, due, points}, i}
										<TableBodyRow on:click={() =>  handleQuiz(id)} class="cursor-pointer">
											<TableBodyCell >{quiz_title ? quiz_title : 'No title'}</TableBodyCell>
											<TableBodyCell >{due ? due.substring(0, 10) : "No date" }</TableBodyCell>
											<TableBodyCell >{points ? points : "No Points" }</TableBodyCell>

											<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium"  >
												<a  class="font-medium
								text-blue-600 hover:underline dark:text-blue-500">
													Edit
												</a>
												<a  on:click|stopPropagation={() => delete_model_open(id)} class="font-medium text-blue-600
								hover:underline dark:text-red-500 ">
													Delete
												</a>
											</TableBodyCell>
										</TableBodyRow>
									{/each}
								{/key}
							</TableBody>
						</Table>
					</TableSearch>

					<!--No courses found-->
					{#if quizzes?.length === 0}
						<div
								class="flex p-4 mb-6 mt-4 ml-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50
						dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
								role="alert"
						>
							<svg
									aria-hidden="true"
									class="flex-shrink-0 inline w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
							>
								<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1
								 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clip-rule="evenodd"
								/>
							</svg>
							<span class="sr-only">Info</span>
							<div>
								<span class="font-medium">No quizzes found...</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

</div>

<Modal title="Add quiz" class="max-w-xs" bind:open={addQuizModel}>
	<!-- Modal body -->
	<form method="POST" action="?/createQuiz" on:submit|preventDefault={handle_quiz_submit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-1">
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Quiz Name</label
				>
				<input
						type="text"
						name="name"
						id="name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Quiz Name"
						required
				/>
			</div>
		</div>
		<button
				type="submit"
				class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			<svg
					class="mr-1 -ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
			>
				<path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
				/>
			</svg>
			Add new quiz
		</button>
	</form>
</Modal>

<!-- Model for remove quiz -->
<Modal title="Remove quiz" class="max-w-xs" bind:open={deleteModel}>
	<p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
	<div class="flex justify-center items-center space-x-4">
		<button on:click={() => deleteModel = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
			No, cancel
		</button>
		<button on:click={() => handleDeleteQuiz(delete_quiz_id)} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
			Yes, I'm sure
		</button>
	</div>
</Modal>
