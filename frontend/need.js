<TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='title'
              label='Title'
              size='small'
              placeholder='Title...'
              name='title'
              autoComplete='title'
              autoFocus
              value={title}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='description'
              name='description'
              label='Description'
              value={description}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='numberOfGuests'
              name='numberOfGuests'
              label='# Of Guests'
              value={numberOfGuests}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='numberOfRooms'
              name='numberOfRooms'
              label='# Of Rooms'
              value={numberOfRooms}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='numberOfBaths'
              name='numberOfBaths'
              label='# Of Baths'
              value={numberOfBaths}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='numberOfBeds'
              name='numberOfBeds'
              label='# Of Beds'
              value={numberOfBeds}
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              placeholder='I had such a...'
              id='price'
              name='price'
              label='Price per night(In Bitcoin)'
              value={price}
              onChange={this.onChange}
            />