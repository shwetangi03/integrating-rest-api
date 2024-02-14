

const apiUrl = 'https://crudcrud.com/api/68b1786f1ed7400fbc7efe18efac0656/bookmarks'; // Replace with your actual API endpoint


// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    // Check if title and URL are not empty
    if (title && url) {
        // Create a new bookmark object
        const bookmark = { title, url };

        // Send a POST request to add a new bookmark
        axios.post(apiUrl, bookmark)
            .then(response => {
                console.log('Bookmark added:', response.data);

                // Clear form fields
                document.getElementById('title').value = '';
                document.getElementById('url').value = '';

                // Fetch and display all bookmarks
                fetchBookmarks();
            })
            .catch(error => {
                console.error('Error adding bookmark:', error);
            });
    } else {
        alert('Please enter both title and URL');
    }
}

// Function to fetch and display all bookmarks
function fetchBookmarks() {
    axios.get(apiUrl)
        .then(response => {
            const bookmarks = response.data;
            displayBookmarks(bookmarks);
        })
        .catch(error => {
            console.error('Error fetching bookmarks:', error);
        });
}

// Function to display all bookmarks
function displayBookmarks(bookmarks) {
    const bookmarksList = document.querySelector('.bookmarks-list');
    bookmarksList.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${bookmark.title}</span>
            <a href="${bookmark.url}" target="_blank">Visit</a>
            <button onclick="editBookmark('${bookmark._id}')">Edit</button>
            <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
        `;
        bookmarksList.appendChild(listItem);
    });
}

// Function to edit a bookmark
function editBookmark(bookmarkId) {
    // Implement edit functionality using a modal or another form
    // You can fetch the specific bookmark by ID and populate the form fields for editing
    // Send a PUT request to update the bookmark on submission
    // Example:
    // axios.put(`${apiUrl}/${bookmarkId}`, updatedBookmarkData)
    //     .then(response => {
    //         console.log('Bookmark updated:', response.data);
    //         // Fetch and display updated bookmarks
    //         fetchBookmarks();
    //     })
    //     .catch(error => {
    //         console.error('Error updating bookmark:', error);
    //     });


}

// Function to delete a bookmark
function deleteBookmark(bookmarkId) {
    // Send a DELETE request to remove the bookmark
    axios.delete(`${apiUrl}/${bookmarkId}`)
        .then(response => {
            console.log('Bookmark deleted:', response.data);
            // Fetch and display updated bookmarks
            fetchBookmarks();
        })
        .catch(error => {
            console.error('Error deleting bookmark:', error);
        });
}

// Fetch and display bookmarks on page load
fetchBookmarks();