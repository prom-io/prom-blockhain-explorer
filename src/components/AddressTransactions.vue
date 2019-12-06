<template>
	<div class="row">
		<h4>Введите адрес</h4>
		<form class="col s12">
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="0x8cc5a1a0802db41db826c2fcb72423744338dcb0" id="address" type="text" class="validate" v-model="address">
				</div>
				<router-link :to="{ name: 'AddressTransactionResult', params: { address: address }}" class="waves-effect waves-light btn">Транзакция адреса</router-link>
			</div>
		</form>
	</div>
</template>
<script>
	export default {
		name: "AddressTransactions",
		data() {
	        return {
	        	address: ''
	        }
	    }
	};
</script>