require 'rails_helper'

describe CamelizeKeys do

  def subject(item)
    CamelizeKeys.run(item)
  end

  it 'works in trivial case' do
    result = subject('hi')
    expect(result).to eq('hi')
  end

  it 'works on hash' do
    result = subject({key_one: 'val', key_two: 'val2'})
    expect(result).to eq({
      keyOne: 'val',
      keyTwo: 'val2'
    })
  end

  it 'handles array' do
    result = subject([
      {key_one: 'val'},
      {key_two: 'val2'}
    ])
    expect(result).to eq([
      {keyOne: 'val'},
      {keyTwo: 'val2'}
    ])
  end
end