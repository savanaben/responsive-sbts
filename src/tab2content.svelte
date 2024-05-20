<script>
	import Avatar from './Avatar.svelte';
  </script>
  
  
  <table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>Quisque vitae semper sem, non venenatis ligula.</td>
            <td>Aliquam erat volutpat. Donec id elit non mi porta gravida at eget metus.</td>
        </tr>
        <tr>
            <td>Curabitur blandit tempus porttitor.</td>
            <td>Vestibulum id ligula porta felis euismod semper.</td>
            <td>Donec ullamcorper nulla non metus auctor fringilla.</td>
        </tr>
        <tr>
            <td>Donec id elit non mi porta gravida at eget metus.</td>
            <td>Maecenas faucibus mollis interdum.</td>
            <td>Donec ullamcorper nulla non metus auctor fringilla.</td>
        </tr>

    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 15px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
</style>