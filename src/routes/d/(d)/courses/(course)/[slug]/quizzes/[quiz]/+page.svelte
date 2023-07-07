<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
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

	let model;
	export let data;
	let course_data = data.courseData;

	let quiz_data;
	$: quiz_data = data.quiz;


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

	function handleQuiz() {
		goto($page.url.pathname + '/build');
	}

	// For search box on assignments
	let searchTerm = '';
	$: filteredItems = quizzes.filter(
			(quizzes) => quizzes.quiz_title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

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
				<button
						class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
						on:click={handleQuiz}>
				<span
						class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Build Quiz
				</span>
				</button>


					<div class="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-2">
						<h2 class="text-2xl font-bold mb-4">Quiz Information</h2>
						<form action="?/updateQuiz" method="POST" on:submit|preventDefault={handle_quiz_submit}>
						<div class="grid grid-cols-2 gap-4 mb-4">
							<div>
								<Label class="font-semibold">Title:</Label>
								<Input class="text-gray-100" id="title" name="title" bind:value={quiz_data.quiz_title}/>
							</div>
							<div>
								<Label class="font-semibold">Attempts:</Label>
								<Input class="text-gray-100" id="attempts" name="attempts" bind:value={quiz_data.quiz_attempts}/>
							</div>
							<div>
								<Label class="font-semibold">Question Count:</Label>
								<Input class="text-gray-100" id="question_count" name="question_count" bind:value={quiz_data.question_count} readonly/>
							</div>
							<div>
								<Label class="font-semibold">Due:</Label>
								<Input class="text-gray-100" id="due" name="due" bind:value={quiz_data.due}/>
							</div>
							<div>
								<Label class="font-semibold">Points:</Label>
								<Input class="text-gray-100" id="points" name="points" bind:value={quiz_data.points} readonly/>
							</div>
						</div>
						<button
								class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
									font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
									group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
									focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800" type="submit">
							<span
									class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
								Save
							</span>
						</button>
						</form>

					</div>


				<div class="flex flex-wrap  -mb-6 text-white font-semibold">
					{#if quizCompleted}
						<p>{quizScoreOutput}</p>
					{:else}
						{#if questions[currentQuestion]}
							<div class="p-4 bg-gray-700 rounded-lg">
								<h2 class="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
								{#if questions[currentQuestion].code}
									<pre class="text-white bg-gray-900 rounded-md p-4">{questions[currentQuestion].code}</pre>
								{/if}
								<ul class="space-y-2">
									{#each questions[currentQuestion].options as option}
										<li>
											<label class="flex items-center">
												<input
														type="radio"
														name="option"
														value={option}
														bind:group={questions[currentQuestion].selectedOption}
														class="mr-2"
												/>
												{option}
											</label>
										</li>
									{/each}
								</ul>
								<button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={checkAnswer}>
									{currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
								</button>
							</div>
						{:else}
							<p>No more questions!</p>
						{/if}
					{/if}
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
