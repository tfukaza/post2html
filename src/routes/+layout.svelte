<script>
	import '../app.css';
</script>

<!-- Navbar is on the top right of the page -->
<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
	</ul>
</nav>

<slot />

<style lang="scss">
	nav {
		display: flex;
		padding: var(--spacing-3);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;

		background-color: white;
		border: 1px solid var(--border-color);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		border-radius: 0px 0px 0px 10px;
	}

	ul {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-3);

		li {
			width: 50px;
			text-align: center;

			a {
				&:hover {
					font-weight: bold;
				}
			}
		}
	}
</style>
